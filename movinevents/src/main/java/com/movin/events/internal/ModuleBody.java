package com.movin.events.internal;

import com.movin.events.BaseEvent;
import com.movin.events.Notify;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

/**
 * 功能：事件中心 - 模块执行体
 * Created by movinliao on 2018/4/28.
 */
final class ModuleBody {
    private boolean paused = false;
    private Map<String, ArrayList<EventBody>> events = new HashMap<String, ArrayList<EventBody>>();

    public ModuleBody(boolean paused) {
        this.paused = paused;
    }

    public void exec(String key, BaseEvent evt) {
        if (paused || !events.containsKey(key)) {
            return;
        }

        ArrayList<EventBody> list =  events.get(key);
        synchronized (this) {
            list = (ArrayList<EventBody>)list.clone();
        }

        execItems(list, evt);
    }

    public void add(String key, Notify notify, int priority) {
        if (!events.containsKey(key)) {
            events.put(key, new ArrayList<EventBody>());
        }
        ArrayList<EventBody> list =  events.get(key);

        synchronized (this) {
            if (indexOf(list, notify, priority) < 0) {
                list.add(new EventBody(notify, priority));
                Collections.sort(list, new Comparator<EventBody>() {
                    @Override
                    public int compare(EventBody item1, EventBody item2) {
                        return item2.getPriority() - item1.getPriority();
                    }
                });
            }
        }
    }

    public void remove(String key, Notify notify, int priority) {
        if (!events.containsKey(key)) {
            return;
        }
        ArrayList<EventBody> list =  events.get(key);

        synchronized (this) {
            int index;
            do {
                index = indexOf(list, notify, priority);
                if (index >= 0) list.remove(index);
            } while (index >= 0);
        }
    }

    public void clear(String key, Object listener) {
        if (!events.containsKey(key)) {
            return;
        }
        ArrayList<EventBody> list =  events.get(key);

        synchronized (this) {
            int index;
            do {
                index = indexOf(list, listener);
                if (index >= 0) list.remove(index);
            } while (index >= 0);
        }
    }

    public void clear() {
        synchronized (this) {
            events.clear();
        }
    }

    public void setPaused(boolean paused) {
        this.paused = paused;
    }

    private void execItems(ArrayList<EventBody> list, BaseEvent evt) {
        for (EventBody body: list) {
            body.exec(evt);
        }
    }

    private int indexOf(ArrayList<EventBody> list, Notify notify, int priority) {
        int result = -1;
        for (int i = 0; i < list.size(); ++i) {
            EventBody item = list.get(i);
            if((item != null) && item.same(notify, priority)) {
                result = i;
                break;
            }
        }
        return result;
    }

    private int indexOf(ArrayList<EventBody> list, Object listener) {
        int result = -1;
        for (int i = 0; i < list.size(); ++i) {
            EventBody item = list.get(i);
            if((item != null) && item.same(listener)) {
                result = i;
                break;
            }
        }
        return result;
    }
}

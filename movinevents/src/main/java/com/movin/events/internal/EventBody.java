package com.movin.events.internal;

import com.movin.events.BaseEvent;
import com.movin.events.EventConst;
import com.movin.events.Notify;

import java.util.HashMap;
import java.util.Map;

/**
 * 功能：事件中心 - 事件执行体
 * Created by movinliao on 2018/4/27.
 */

final class EventBody {
    private static final Map<Integer, Notify> handers = new HashMap<>();
    private static int baseKey = 0;

    private int bodyKey = 0;
    private int priority = EventConst.NORMAL;

    public static void clear() {
        synchronized (EventBody.class) {
            handers.clear();
        }
    }

    public EventBody(Notify notify, int priority) {
        synchronized (EventBody.class) {
            bodyKey = ++baseKey;
            handers.put(bodyKey, notify);
        }

        this.priority = priority;
    }

    protected void finalize() throws java.lang.Throwable {
        synchronized (EventBody.class) {
            handers.remove(bodyKey);
        }

        super.finalize();
    }

    public Notify getNotify() {
        return handers.get(bodyKey);
    }

    public boolean same(Notify notify, int priority) {
        Notify data = handers.get(bodyKey);

        return (data != null) && data.equals(notify) && (this.priority == priority);
    }

    public boolean same(Object listener) {
        Notify data = handers.get(bodyKey);

        return (data != null) && data.equals(listener);
    }

    public void exec(BaseEvent evt) {
        Notify data = handers.get(bodyKey);
        if (data.isNull()) return;
        data.invoke(evt);
    }

    public int getPriority() {
        return priority;
    }
}

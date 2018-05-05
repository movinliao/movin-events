package com.movin.movinevents;

import com.movin.movinevents.internal.EventCenter;

/**
 * 功能：事件分发
 * Created by movinliao on 2018/4/27.
 */
public class Dispatcher {
    private String baseKey;

    public Dispatcher() {
        baseKey = this.toString();
    }

    public void addListener(String key, String method) {
        addListener(key, method, EventConst.NORMAL);
    }

    public void addListener(String key, String method, int priority) {
        addListener(key, this, method, EventConst.NORMAL);
    }

    public void addListener(String key, String method, int priority, boolean async) {
        addListener(key, this, method, priority, async);
    }

    public void addListener(String key, Object listener, String method, int priority) {
        EventCenter.addListener(baseKey, key, new Notify(listener, method), priority);
    }

    public void addListener(String key, Object listener, String method, int priority, boolean async) {
        EventCenter.addListener(baseKey, key, new Notify(listener, method, async), priority);
    }

    public void removeListener(String key, String method) {
        removeListener(key, method, EventConst.NORMAL);
    }

    public void removeListener(String key, String method, int priority) {
        removeListener(key, this, method, priority);
    }

    public void removeListener(String key, Object listener, String method, int priority) {
        EventCenter.addListener(baseKey, key, new Notify(listener, method), priority);
    }

    public void dispatch(String key, BaseEvent event) {
        EventCenter.dispatch(baseKey, key, event);
    }

    public void doEvent(String key, Object data) {
        BaseEvent evt = new BaseEvent(key, data);
        dispatch(key, evt);
    }

    public void on(String key, String method) {
        addListener(key, method, EventConst.NORMAL, true);
    }

    public void on(String key, Object listener, String method) {
        addListener(key, listener, method, EventConst.NORMAL, true);
    }

    public void on(String key, String method, int priority) {
        addListener(key, method, priority, true);
    }

    public void on(String key, Object listener, String method, int priority) {
        addListener(key, listener, method, priority, true);
    }

    public void off(String key, String method) {
        removeListener(key, method, EventConst.NORMAL);
    }

    public void off(String key, Object listener, String method) {
        removeListener(key, listener, method, EventConst.NORMAL);
    }

    public void off(String key, String method, int priority) {
        removeListener(key, method, priority);
    }

    public void off(String key, Object listener, String method, int priority) {
        removeListener(key, listener, method, priority);
    }

    public void clear() {
        EventCenter.clear(baseKey);
    }

    public void clear(String key, Object listener) {
        EventCenter.clear(baseKey, key, listener);
    }

    public void setPaused(boolean paused) {
        EventCenter.setPause(baseKey, paused);
    }
}

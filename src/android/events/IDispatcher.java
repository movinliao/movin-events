package com.duowan.yylove.base.events;

/**
 * 作者：movinliao
 * 时间：2018/5/15:19:26
 * 邮箱：
 * 说明：
 */
public interface IDispatcher {
    void addListener(String key, String method);
    void addListener(String key, String method, int priority);
    void addListener(String key, String method, int priority, boolean async);
    void addListener(String key, Object listener, String method, int priority);
    void addListener(String key, Object listener, String method, int priority, boolean async);

    void removeListener(String key, String method);
    void removeListener(String key, String method, int priority);
    void removeListener(String key, Object listener, String method, int priority);

    void dispatch(String key, BaseEvent event);
    void doEvent(String key, Object data);

    void on(String key, String method);
    void on(String key, Object listener, String method);
    void on(String key, String method, int priority);
    void on(String key, Object listener, String method, int priority);

    void off(String key, String method);
    void off(String key, Object listener, String method);
    void off(String key, String method, int priority);
    void off(String key, Object listener, String method, int priority);

    void clear();
    void clear(String key, Object listener);

    void setPaused(boolean paused);

    void addEvents(Object target, Class keyMap);
    void removeEvents(Object target, Class keyMap);
}

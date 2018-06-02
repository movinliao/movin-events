package com.duowan.yylove.base;

import com.duowan.yylove.base.events.IDispatcher;

import java.util.Set;

/**
 * 作者：movinliao
 * 时间：2018/5/15:19:18
 * 邮箱：
 * 说明：
 */
public interface IModule extends IDispatcher {
    void init(Object api);
    void destroy();

    void start();
    void stop();

    void doEvent(String key, Object data, int priority);
    void addBlock(String key, IBlock block);
    void removeBlock(String key);

    <T> T block(Class<T> cls);
    boolean hasBlock(String key);
    boolean isInited();
    Object getApi();
    Set<String> keys();

    void log(Object tag, String format, Object... args);

    Object invoke(Class cls, String cmd, Object... args);
}

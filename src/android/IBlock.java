package com.duowan.yylove.base;

import com.duowan.yylove.base.events.IDispatcher;

import java.lang.reflect.InvocationHandler;

/**
 * 作者：movinliao
 * 时间：2018/5/15:19:15
 * 邮箱：
 * 说明：
 */
public interface IBlock extends InvocationHandler, IDispatcher {
    void init(Object module);
    void destroy();

    void start();
    void stop();

    boolean isStoped();
    Object getModule();

    void log(Object tag, String format, Object... args);

    Object invoke(String cmd, Object[] args);
}

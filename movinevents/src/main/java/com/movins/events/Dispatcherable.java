package com.movins.events;

/**
 * 作者：movinliao
 * 时间：2018/5/7:14:42
 * 邮箱：
 * 说明：
 */
public interface Dispatcherable {
    void dispatch(String key, BaseEvent event);
}

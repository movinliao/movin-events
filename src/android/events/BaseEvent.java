package com.duowan.yylove.base.events;

import com.duowan.yylove.base.Dataable;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 功能：事件数据基类
 * Created by movinliao on 2018/4/27.
 */
public class BaseEvent extends Dataable {
    public String key;
    public Object eventData = null;

    public BaseEvent(String key) {
        this.key = key;
    }

    public BaseEvent (String key, Object data) {
        this.key = key;
        this.eventData = data;
    }
}

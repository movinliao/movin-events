package com.movin.events;

import com.movin.events.Dataable;
/**
 * 功能：事件数据基类
 * Created by movinliao on 2018/4/27.
 */
public class BaseEvent extends Dataable {
    public String key;
    public Object eventData = null;

    public static String kInfoChanged = "BaseEvent.kInfoChanged";

    public BaseEvent(String key) {
        this.key = key;
    }

    public BaseEvent (String key, Object data) {
        this.key = key;
        this.eventData = data;
    }
}

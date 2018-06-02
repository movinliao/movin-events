package com.duowan.yylove.base;

import com.duowan.yylove.base.events.BaseEvent;
import com.duowan.yylove.base.events.EventKey;

/**
 * 功能：模块事件定义
 * Created by movinliao on 2018/4/28.
 */
public class ModuleEvent extends BaseEvent {
    public int priority = 0;

    @EventKey
    public static final String kLog = "ModuleEvent.kLog";
    @EventKey
    public static final String kInit = "ModuleEvent.kInit";
    @EventKey
    public static final String kDestroy = "ModuleEvent.kDestroy";
    @EventKey
    public static final String kStart = "ModuleEvent.kStart";
    @EventKey
    public static final String kStop = "ModuleEvent.kStop";
    @EventKey
    public static final String kAdd = "ModuleEvent.kAdd";
    @EventKey
    public static final String kRemove = "ModuleEvent.kRemove";

    public ModuleEvent(String key, Object data) {
        super(key, data);
    }

    public ModuleEvent(String key, Object data, int priority) {
        super(key, data);
        this.priority = priority;
    }
}

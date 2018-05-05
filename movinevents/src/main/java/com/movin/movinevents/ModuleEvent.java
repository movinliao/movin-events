package com.movin.movinevents;

/**
 * 功能：模块事件定义
 * Created by movinliao on 2018/4/28.
 */
public class ModuleEvent extends BaseEvent {
    public int priority = 0;

    public static String kLog = "ModuleEvent.kLog";
    public static String kInit = "ModuleEvent.kInit";
    public static String kDestroy = "ModuleEvent.kDestroy";
    public static String kStart = "ModuleEvent.kStart";
    public static String kStop = "ModuleEvent.kStop";
    public static String kAdd = "ModuleEvent.kAdd";
    public static String kRemove = "ModuleEvent.kRemove";

    public ModuleEvent(String key, Object data) {
        super(key, data);
    }

    public ModuleEvent(String key, Object data, int priority) {
        super(key, data);
        this.priority = priority;
    }
}

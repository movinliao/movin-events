package com.movins.events;

/**
 * 功能：功能块基类
 * Created by movinliao on 2018/4/28.
 */
public class BlockBase extends Dispatcher {
    private Object module;
    private boolean stoped;

    public void init(Object module) {
        this.module = module;
    }

    public void destroy() {
        clear();
        module = null;
    }

    public void start() {
        stoped = false;
        setPaused(false);
    }

    public void stop() {
        setPaused(true);
        stoped = true;
    }

    public boolean isStoped() {
        return stoped;
    }

    public Object getModule() {
        return module;
    }

    public void log(Object obj, String context, Object priority) {
        MethodUtils.apply(module, "log", context, priority);
    }
}

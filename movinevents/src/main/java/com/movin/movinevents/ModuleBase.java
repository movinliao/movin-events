package com.movin.movinevents;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * 功能：模块定义框架
 * Created by movinliao on 2018/4/28.
 */
public class ModuleBase extends Dispatcher {
    private Object api = null;
    private boolean inited = false;
    private Map<String, BlockBase> blocks = new HashMap<String, BlockBase>();

    public void doEvent(String key, Object data, int priority) {
        ModuleEvent evt = new ModuleEvent(key, data, priority);
        dispatch(key, evt);
    }

    public void init(Object api) {
        this.api = api;
        Iterator itr = blocks.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry entry = (Map.Entry) itr.next();
            BlockBase item = (BlockBase)entry.getValue();
            if (item != null) item.init(this);
        }

        doEvent(ModuleEvent.kInit, null, 0);
    }

    public void destroy() {
        doEvent(ModuleEvent.kDestroy, null, 0);
        Iterator itr = blocks.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry entry = (Map.Entry) itr.next();
            BlockBase item = (BlockBase)entry.getValue();
            if (item != null) item.destroy();
        }
        blocks.clear();
        api = null;
        blocks = null;
    }

    public void start() {
        setPaused(false);

        Iterator itr = blocks.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry entry = (Map.Entry) itr.next();
            BlockBase item = (BlockBase)entry.getValue();
            if (item != null) item.start();
        }

        doEvent(ModuleEvent.kStart, null, 0);
    }

    public void stop() {
        doEvent(ModuleEvent.kStop, null, 0);

        setPaused(true);

        Iterator itr = blocks.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry entry = (Map.Entry) itr.next();
            BlockBase item = (BlockBase)entry.getValue();
            if (item != null) item.stop();
        }
    }

    public void addBlock(String key, BlockBase block) {
        if((block == null) || !blocks.containsKey(key)) {
            return;
        }

        if (inited) {
            block.init(this);
        }

        blocks.put(key, block);

        doEvent(ModuleEvent.kAdd, key, 0);
    }

    public void removeBlock(String key) {
        if (!blocks.containsKey(key)) {
            return;
        }

        doEvent(ModuleEvent.kRemove, key, 0);

        BlockBase block = blocks.remove(key);
        block.destroy();
    }

    public BlockBase block(String key) {
        return blocks.get(key);
    }

    public boolean hasBlock(String key) {
        return blocks.containsKey(key);
    }

    public boolean isInited() {
        return inited;
    }

    public Object getApi() {
        return api;
    }

    public Set<String> keys() {
        return blocks.keySet();
    }

    public void addBlockListener(String blockKey, String key, Object listener, String method, int priority) {
        BlockBase block = blocks.get(blockKey);
        if (block != null) {
            block.addListener(key, listener, method, priority);
        }
    }

    public void removeBlockListener(String blockKey, String key, Object listener, String method, int priority) {
        BlockBase block = blocks.get(blockKey);
        if (block != null) {
            block.removeListener(key, listener, method, priority);
        }
    }

    public void log(String content, int priority) {

    }
}

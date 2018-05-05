package com.movin.events;

import android.os.Handler;
import android.os.Looper;

/**
 * 功能：通知体
 * Created by movinliao on 2018/4/27.
 */
public final class Notify {
    private static long mainThreadId = Looper.getMainLooper().getThread().getId();
    private static Handler handler = new Handler(Looper.getMainLooper());

    private String method;
    private Object listener;
    private boolean async;

    public Notify(Object listener, String method) {
        this.listener = listener;
        this.method = method;
        this.async = false;
    }

    public Notify(Object listener, String method, boolean async) {
        this.listener = listener;
        this.method = method;
        this.async = async;
    }

    public Object invoke(final Object... args) {
        Object result = null;
        if (!async || isMainThread()) {
            result = doInvoke(args);
        } else {
            handler.post(new Runnable() {
                public void run() {
                    doInvoke(args);
                }
            });
        }

        return result;
    }

    public boolean equals(Notify obj) {
        return (obj != null) && (obj.listener == this.listener) && this.method.equals(obj.method);
    }

    public boolean equals(Object listener) {
        return (listener == this.listener);
    }

    public boolean isNull() {
        return (listener == null);
    }

    private Object doInvoke(Object... args) {
        Object result = null;
        if (listener != null && !method.isEmpty()) {
            result = MethodUtils.apply(listener, method, args);
        }

        return result;
    }

    private boolean isMainThread() {
        return Thread.currentThread().getId() == mainThreadId;
    }
}

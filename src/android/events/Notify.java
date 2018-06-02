package com.duowan.yylove.base.events;

import android.os.Handler;
import android.os.Looper;

import com.duowan.yylove.base.MethodUtils;

/**
 * 功能：通知体
 * Created by movinliao on 2018/4/27.
 */
public final class Notify {
    private static long mainThreadId = Looper.getMainLooper().getThread().getId();
    private static Handler handler = new Handler(Looper.getMainLooper());

    private String mMethod;
    private Object mListener;
    private boolean mSync;

    public Notify(Object listener, String method) {
        this.mListener = listener;
        this.mMethod = method;
        this.mSync = false;
    }

    public Notify(Object listener, String method, boolean async) {
        this.mListener = listener;
        this.mMethod = method;
        this.mSync = async;
    }

    public Object invoke(final Object... args) {
        Object result = null;
        if (!mSync || isMainThread()) {
            result = doInvoke(args);
        } else {
            handler.post(new Runnable() {
                @Override
                public void run() {
                    doInvoke(args);
                }
            });
        }

        return result;
    }

    public boolean equals(Notify obj) {
        return (obj != null) && (obj.mListener == this.mListener) && this.mMethod.equals(obj.mMethod);
    }

    public boolean equals(Object listener) {
        return (listener == this.mListener);
    }

    public boolean isNull() {
        return (mListener == null);
    }

    private Object doInvoke(Object... args) {
        Object result = null;
        if (mListener != null && !mMethod.isEmpty()) {
            result = MethodUtils.apply(mListener, mMethod, args);
        }

        return result;
    }

    private boolean isMainThread() {
        return Thread.currentThread().getId() == mainThreadId;
    }
}

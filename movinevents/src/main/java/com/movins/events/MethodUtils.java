package com.movins.events;

import java.lang.reflect.Method;

/**
 * 功能：方法类函数库
 * Created by movinliao on 2018/4/28.
 */
public final class MethodUtils {
    public static Object apply(Object obj, String name, Object... args) {
        Object result = null;
        if (obj != null) {
            Class cArg[] = {};
            if (args.length > 0) {
                cArg = new Class[args.length];
                for (int i = 0; i < args.length; ++i) {
                    cArg[i] = args[i].getClass();
                }
            }
            try{
                Class cls = obj.getClass();
                Method work = cls.getDeclaredMethod(name, cArg);
                work.setAccessible(true);

                if (work != null) {
                    result = work.invoke(obj, args);
                }
            } catch(Exception e) {
                System.out.println(e.toString());
            }
        }

        return result;
    }
}

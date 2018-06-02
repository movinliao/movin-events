package com.duowan.yylove.base.events;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 作者：movinliao
 * 时间：2018/5/11:20:03
 * 邮箱：
 * 说明：
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface OnListener {
    String key();
    int priority() default 1;
    boolean sync() default false;
}

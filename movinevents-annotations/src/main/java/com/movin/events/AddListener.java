package com.movin.events;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.SOURCE)
public @interface AddListener {
    String target() default "";
    String[] keys();
    int priority() default 1;
    boolean sync() default false;
}

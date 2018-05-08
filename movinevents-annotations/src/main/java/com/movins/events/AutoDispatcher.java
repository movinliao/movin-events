package com.movins.events;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE) // on class level
@Retention(RetentionPolicy.SOURCE)
public @interface AutoDispatcher {
    int version() default 0;
    Class extend() default NONE.class;
    Class[] implement() default {};

    enum NONE { }
}

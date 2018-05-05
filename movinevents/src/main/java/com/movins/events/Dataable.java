package com.movins.events;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.Arrays;

/**
 * 功能：数据基类
 * Created by movinliao on 2018/4/27.
 */

public class Dataable implements Serializable{
    private static final long serialVersionUID = 3095437695863577149L;
    public boolean empty = true;

    public boolean equals(Object obj) {
        Class cls1 = this.getClass();
        Field [] fields1 = cls1.getDeclaredFields();

        Class cls2 = obj.getClass();
        Field [] fields2 = cls2.getDeclaredFields();

        if (fields1.length != fields2.length) {
            return false;
        }

        for (int i = 0; i < fields1.length; ++i) {
            Field field1 = fields1[i];
            Field field2 = fields2[i];
            if (!field1.equals(field2)) {
                return false;
            }
            if(ignoreField(field1.getName())) {
                continue;
            }

            try {
                if (!field1.get(this).equals(field2.get(obj))) {
                    return false;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return true;
    }

    public void clear() {
        try {
            Class cls = this.getClass();
            Object value = cls.newInstance();
            Field [] fields = cls.getDeclaredFields();
            for (Field field: fields) {
                if(ignoreField(field.getName())) {
                    continue;
                }

                field.set(this, field.get(value));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Object clone () {
        Object result = null;
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(this);

            ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
            ObjectInputStream ois = new ObjectInputStream(bais);
            result = ois.readObject();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return result;
    }

    protected boolean ignoreField (String fieldName) {
        String [] fields = {"serialVersionUID"};
        return Arrays.asList(fields).contains(fieldName);
    }
}

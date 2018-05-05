package com.movins.android.movinevents;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.widget.TextView;

public class PersonActivity extends AppCompatActivity {

    private static final String EXTRA_PERSON = "EXTRA_PERSON";

    @Nullable
    public static Intent createIntent(@NonNull Context context, Parcelable person) {
        //noinspection ConstantConditions
        if (context == null) {
            return null;
        }
        Intent intent = new Intent(context, PersonActivity.class);
        // we need to cast it to Parcelable because Person does not itself implement parcelable
        intent.putExtra(EXTRA_PERSON, (Parcelable) person);

        return intent;
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_person);

        TextView fullName = (TextView) findViewById(R.id.fullName);
        TextView date = (TextView) findViewById(R.id.dateOfBirth);
        TextView age = (TextView) findViewById(R.id.age);
        TextView fullAddress = (TextView) findViewById(R.id.fullAddress);

        // get the passed intent
        Intent intent = getIntent();
        if (intent != null) {
            Parcelable person = intent.getParcelableExtra(EXTRA_PERSON);
        }
    }
}

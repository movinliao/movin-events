package com.movins.android.movinevents;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;

import com.movins.events.AutoDispatcher;

@AutoDispatcher
public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private EditText mAgeEditText;
    private EditText mNameEditText;
    private EditText mBdayEditText;
    private EditText mStreetEditText;
    private EditText mPostcodeEditText;
    private EditText mCityEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mNameEditText = (EditText) findViewById(R.id.fullName);
        mBdayEditText = (EditText) findViewById(R.id.dateOfBirth);
        mAgeEditText = (EditText) findViewById(R.id.age);
        mStreetEditText = (EditText) findViewById(R.id.street);
        mPostcodeEditText = (EditText) findViewById(R.id.postCode);
        mCityEditText = (EditText) findViewById(R.id.city);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent activityIntent = PersonActivity.createIntent(MainActivity.this, null);

                if (activityIntent != null) {
                    MainActivity.this.startActivity(activityIntent);
                }
            }
        });
    }

}

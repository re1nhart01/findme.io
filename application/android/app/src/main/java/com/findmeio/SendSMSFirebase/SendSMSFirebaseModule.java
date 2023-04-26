package com.findmeio.sendSMSFirebase;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SendSMSFirebaseModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext ctx;
    public SendSMSFirebaseModule(ReactApplicationContext parentContext) {
        super(parentContext);
        this.ctx = parentContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "SendSMSFirebase";
    }
}

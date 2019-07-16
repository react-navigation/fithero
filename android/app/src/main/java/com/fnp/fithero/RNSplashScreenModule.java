package com.fnp.fithero;

import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import javax.annotation.Nonnull;

@ReactModule(name = RNSplashScreenModule.NAME)
public class RNSplashScreenModule extends ReactContextBaseJavaModule {

  public static final String NAME = "RNSplashScreen";

  RNSplashScreenModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Nonnull
  @Override
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void hide() {
    final Activity activity = getCurrentActivity();
    if (activity != null) {
      activity.runOnUiThread(((MainActivity) activity)::switchToReactView);
    }
  }
}

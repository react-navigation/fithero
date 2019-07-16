package com.fnp.fithero;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import is.uncommon.rn.widgets.TabbedViewPagerAndroidPackage;

import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import com.reactnativecommunity.asyncstorage.AsyncStorageModule;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.bugsnag.BugsnagReactNative;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;

import expo.modules.constants.ConstantsPackage;
import expo.modules.filesystem.FileSystemPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import expo.modules.documentpicker.DocumentPickerPackage;
import io.realm.react.RealmReactPackage;

public class MainApplication extends Application implements ReactApplication, ShareApplication {

  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.asList(
      new ReactAdapterPackage(),
      new FileSystemPackage(),
      new ConstantsPackage(),
      new DocumentPickerPackage()
  ), Collections.emptyList());

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(
          new MainReactPackage(),
          new MPAndroidChartPackage(),
          new TabbedViewPagerAndroidPackage(),
          new RNGestureHandlerPackage(),
          BugsnagReactNative.getPackage(),
          new RealmReactPackage(),
          new RNLocalizePackage(),
          new VectorIconsPackage(),
          new RNSharePackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider),
          new TurboReactPackage() {
            @Override
            public NativeModule getModule(String name, ReactApplicationContext reactContext) {
              switch (name) {
                case AsyncStorageModule.NAME:
                  return new AsyncStorageModule(reactContext);
                case RNSplashScreenModule.NAME:
                  return new RNSplashScreenModule(reactContext);
                default:
                  throw new IllegalArgumentException("Could not find module " + name);
              }
            }

            @Override
            public ReactModuleInfoProvider getReactModuleInfoProvider() {
              return () -> {
                Map<String, ReactModuleInfo> map = new HashMap<>();
                map.put(AsyncStorageModule.NAME,
                    new ReactModuleInfo(AsyncStorageModule.NAME,
                    "com.reactnativecommunity.asyncstorage.AsyncStorageModule",
                    false,
                    false,
                    false,
                    false,
                    false));
                map.put(RNSplashScreenModule.NAME,
                    new ReactModuleInfo(RNSplashScreenModule.NAME,
                        "com.fnp.fithero.RNSplashScreenModule",
                        false,
                        false,
                        false,
                        false,
                        false));
                return map;
              };
            }
          }
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
  public String getFileProviderAuthority() {
    return BuildConfig.APPLICATION_ID + ".provider";
  }
}

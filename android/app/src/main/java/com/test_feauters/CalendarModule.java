package com.test_feauters;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class CalendarModule extends ReactContextBaseJavaModule {
  CalendarModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "CalendarModule";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("DEFAULT_EVENT_NAME", "New Event");
    return constants;
  }

  @ReactMethod
  public void createCalendarEvent(
      String name,
      String location,
      Callback myFailureCallback,
      Callback callback)
  {
    Integer eventId = 3;
    callback.invoke("There are no errors", eventId);
    Log.d(
      "CalendarModule",
      "Create event called with name: " + name + " and location: " + location);

  }

  @ReactMethod
  public void createCalendarEventTwo(
      String name,
      String location,
      Promise promise)
  {
    try {
      Integer eventId = 1;
      promise.resolve(eventId);
      // This is work not at all
      // promise.reject("Create Event error", "Error parsing data");
    } catch(Exception e) {
      promise.reject("Create Event Error", e);
    } finally {
      Log.d(
          "CalendarModule",
          "Create event called with name: " + name + " and location: " + location);
    }
  }
}


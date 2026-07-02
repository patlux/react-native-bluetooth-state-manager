#include "BluetoothStateManagerOnLoad.hpp"
#include <fbjni/fbjni.h>
#include <jni.h>

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
  return margelo::nitro::bluetoothstatemanager::initialize(vm);
}

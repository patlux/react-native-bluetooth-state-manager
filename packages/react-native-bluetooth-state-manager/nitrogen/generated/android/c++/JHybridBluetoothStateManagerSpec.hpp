///
/// HybridBluetoothStateManagerSpec.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

#include <NitroModules/JHybridObject.hpp>
#include <fbjni/fbjni.h>
#include "HybridBluetoothStateManagerSpec.hpp"




namespace margelo::nitro::bluetoothstatemanager {

  using namespace facebook;

  class JHybridBluetoothStateManagerSpec: public jni::HybridClass<JHybridBluetoothStateManagerSpec, JHybridObject>,
                                          public virtual HybridBluetoothStateManagerSpec {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/bluetoothstatemanager/HybridBluetoothStateManagerSpec;";
    static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject> jThis);
    static void registerNatives();

  protected:
    // C++ constructor (called from Java via `initHybrid()`)
    explicit JHybridBluetoothStateManagerSpec(jni::alias_ref<jhybridobject> jThis) :
      HybridObject(HybridBluetoothStateManagerSpec::TAG),
      _javaPart(jni::make_global(jThis)) {}

  public:
    ~JHybridBluetoothStateManagerSpec() override {
      // Hermes GC can destroy JS objects on a non-JNI Thread.
      jni::ThreadScope::WithClassLoader([&] { _javaPart.reset(); });
    }

  public:
    size_t getExternalMemorySize() noexcept override;

  public:
    inline const jni::global_ref<JHybridBluetoothStateManagerSpec::javaobject>& getJavaPart() const noexcept {
      return _javaPart;
    }

  public:
    // Properties
    

  public:
    // Methods
    std::shared_ptr<Promise<BluetoothState>> getState() override;
    BluetoothState getStateSync() override;
    std::string addListener(const std::function<void(BluetoothState /* state */)>& callback) override;
    void removeListener(const std::string& callbackRef) override;
    std::shared_ptr<Promise<void>> openSettings() override;
    std::shared_ptr<Promise<void>> requestToEnable() override;
    std::shared_ptr<Promise<void>> requestToDisable() override;

  private:
    friend HybridBase;
    using HybridBase::HybridBase;
    jni::global_ref<JHybridBluetoothStateManagerSpec::javaobject> _javaPart;
  };

} // namespace margelo::nitro::bluetoothstatemanager

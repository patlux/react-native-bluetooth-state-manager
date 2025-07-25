///
/// BluetoothStateManager-Swift-Cxx-Bridge.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

// Forward declarations of C++ defined types
// Forward declaration of `BluetoothState` to properly resolve imports.
namespace margelo::nitro::bluetoothstatemanager { enum class BluetoothState; }
// Forward declaration of `HybridBluetoothStateManagerSpec` to properly resolve imports.
namespace margelo::nitro::bluetoothstatemanager { class HybridBluetoothStateManagerSpec; }

// Forward declarations of Swift defined types
// Forward declaration of `HybridBluetoothStateManagerSpec_cxx` to properly resolve imports.
namespace BluetoothStateManager { class HybridBluetoothStateManagerSpec_cxx; }

// Include C++ defined types
#include "BluetoothState.hpp"
#include "HybridBluetoothStateManagerSpec.hpp"
#include <NitroModules/Promise.hpp>
#include <NitroModules/PromiseHolder.hpp>
#include <NitroModules/Result.hpp>
#include <exception>
#include <functional>
#include <memory>
#include <string>

/**
 * Contains specialized versions of C++ templated types so they can be accessed from Swift,
 * as well as helper functions to interact with those C++ types from Swift.
 */
namespace margelo::nitro::bluetoothstatemanager::bridge::swift {

  // pragma MARK: std::shared_ptr<Promise<BluetoothState>>
  /**
   * Specialized version of `std::shared_ptr<Promise<BluetoothState>>`.
   */
  using std__shared_ptr_Promise_BluetoothState__ = std::shared_ptr<Promise<BluetoothState>>;
  inline std::shared_ptr<Promise<BluetoothState>> create_std__shared_ptr_Promise_BluetoothState__() {
    return Promise<BluetoothState>::create();
  }
  inline PromiseHolder<BluetoothState> wrap_std__shared_ptr_Promise_BluetoothState__(std::shared_ptr<Promise<BluetoothState>> promise) {
    return PromiseHolder<BluetoothState>(std::move(promise));
  }
  
  // pragma MARK: std::function<void(BluetoothState /* result */)>
  /**
   * Specialized version of `std::function<void(BluetoothState)>`.
   */
  using Func_void_BluetoothState = std::function<void(BluetoothState /* result */)>;
  /**
   * Wrapper class for a `std::function<void(BluetoothState / * result * /)>`, this can be used from Swift.
   */
  class Func_void_BluetoothState_Wrapper final {
  public:
    explicit Func_void_BluetoothState_Wrapper(std::function<void(BluetoothState /* result */)>&& func): _function(std::make_shared<std::function<void(BluetoothState /* result */)>>(std::move(func))) {}
    inline void call(int result) const {
      _function->operator()(static_cast<BluetoothState>(result));
    }
  private:
    std::shared_ptr<std::function<void(BluetoothState /* result */)>> _function;
  };
  Func_void_BluetoothState create_Func_void_BluetoothState(void* _Nonnull swiftClosureWrapper);
  inline Func_void_BluetoothState_Wrapper wrap_Func_void_BluetoothState(Func_void_BluetoothState value) {
    return Func_void_BluetoothState_Wrapper(std::move(value));
  }
  
  // pragma MARK: std::function<void(const std::exception_ptr& /* error */)>
  /**
   * Specialized version of `std::function<void(const std::exception_ptr&)>`.
   */
  using Func_void_std__exception_ptr = std::function<void(const std::exception_ptr& /* error */)>;
  /**
   * Wrapper class for a `std::function<void(const std::exception_ptr& / * error * /)>`, this can be used from Swift.
   */
  class Func_void_std__exception_ptr_Wrapper final {
  public:
    explicit Func_void_std__exception_ptr_Wrapper(std::function<void(const std::exception_ptr& /* error */)>&& func): _function(std::make_shared<std::function<void(const std::exception_ptr& /* error */)>>(std::move(func))) {}
    inline void call(std::exception_ptr error) const {
      _function->operator()(error);
    }
  private:
    std::shared_ptr<std::function<void(const std::exception_ptr& /* error */)>> _function;
  };
  Func_void_std__exception_ptr create_Func_void_std__exception_ptr(void* _Nonnull swiftClosureWrapper);
  inline Func_void_std__exception_ptr_Wrapper wrap_Func_void_std__exception_ptr(Func_void_std__exception_ptr value) {
    return Func_void_std__exception_ptr_Wrapper(std::move(value));
  }
  
  // pragma MARK: std::shared_ptr<Promise<void>>
  /**
   * Specialized version of `std::shared_ptr<Promise<void>>`.
   */
  using std__shared_ptr_Promise_void__ = std::shared_ptr<Promise<void>>;
  inline std::shared_ptr<Promise<void>> create_std__shared_ptr_Promise_void__() {
    return Promise<void>::create();
  }
  inline PromiseHolder<void> wrap_std__shared_ptr_Promise_void__(std::shared_ptr<Promise<void>> promise) {
    return PromiseHolder<void>(std::move(promise));
  }
  
  // pragma MARK: std::function<void()>
  /**
   * Specialized version of `std::function<void()>`.
   */
  using Func_void = std::function<void()>;
  /**
   * Wrapper class for a `std::function<void()>`, this can be used from Swift.
   */
  class Func_void_Wrapper final {
  public:
    explicit Func_void_Wrapper(std::function<void()>&& func): _function(std::make_shared<std::function<void()>>(std::move(func))) {}
    inline void call() const {
      _function->operator()();
    }
  private:
    std::shared_ptr<std::function<void()>> _function;
  };
  Func_void create_Func_void(void* _Nonnull swiftClosureWrapper);
  inline Func_void_Wrapper wrap_Func_void(Func_void value) {
    return Func_void_Wrapper(std::move(value));
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::bluetoothstatemanager::HybridBluetoothStateManagerSpec>
  /**
   * Specialized version of `std::shared_ptr<margelo::nitro::bluetoothstatemanager::HybridBluetoothStateManagerSpec>`.
   */
  using std__shared_ptr_margelo__nitro__bluetoothstatemanager__HybridBluetoothStateManagerSpec_ = std::shared_ptr<margelo::nitro::bluetoothstatemanager::HybridBluetoothStateManagerSpec>;
  std::shared_ptr<margelo::nitro::bluetoothstatemanager::HybridBluetoothStateManagerSpec> create_std__shared_ptr_margelo__nitro__bluetoothstatemanager__HybridBluetoothStateManagerSpec_(void* _Nonnull swiftUnsafePointer);
  void* _Nonnull get_std__shared_ptr_margelo__nitro__bluetoothstatemanager__HybridBluetoothStateManagerSpec_(std__shared_ptr_margelo__nitro__bluetoothstatemanager__HybridBluetoothStateManagerSpec_ cppType);
  
  // pragma MARK: std::weak_ptr<margelo::nitro::bluetoothstatemanager::HybridBluetoothStateManagerSpec>
  using std__weak_ptr_margelo__nitro__bluetoothstatemanager__HybridBluetoothStateManagerSpec_ = std::weak_ptr<margelo::nitro::bluetoothstatemanager::HybridBluetoothStateManagerSpec>;
  inline std__weak_ptr_margelo__nitro__bluetoothstatemanager__HybridBluetoothStateManagerSpec_ weakify_std__shared_ptr_margelo__nitro__bluetoothstatemanager__HybridBluetoothStateManagerSpec_(const std::shared_ptr<margelo::nitro::bluetoothstatemanager::HybridBluetoothStateManagerSpec>& strong) { return strong; }
  
  // pragma MARK: Result<std::shared_ptr<Promise<BluetoothState>>>
  using Result_std__shared_ptr_Promise_BluetoothState___ = Result<std::shared_ptr<Promise<BluetoothState>>>;
  inline Result_std__shared_ptr_Promise_BluetoothState___ create_Result_std__shared_ptr_Promise_BluetoothState___(const std::shared_ptr<Promise<BluetoothState>>& value) {
    return Result<std::shared_ptr<Promise<BluetoothState>>>::withValue(value);
  }
  inline Result_std__shared_ptr_Promise_BluetoothState___ create_Result_std__shared_ptr_Promise_BluetoothState___(const std::exception_ptr& error) {
    return Result<std::shared_ptr<Promise<BluetoothState>>>::withError(error);
  }
  
  // pragma MARK: Result<BluetoothState>
  using Result_BluetoothState_ = Result<BluetoothState>;
  inline Result_BluetoothState_ create_Result_BluetoothState_(BluetoothState value) {
    return Result<BluetoothState>::withValue(std::move(value));
  }
  inline Result_BluetoothState_ create_Result_BluetoothState_(const std::exception_ptr& error) {
    return Result<BluetoothState>::withError(error);
  }
  
  // pragma MARK: Result<std::string>
  using Result_std__string_ = Result<std::string>;
  inline Result_std__string_ create_Result_std__string_(const std::string& value) {
    return Result<std::string>::withValue(value);
  }
  inline Result_std__string_ create_Result_std__string_(const std::exception_ptr& error) {
    return Result<std::string>::withError(error);
  }
  
  // pragma MARK: Result<void>
  using Result_void_ = Result<void>;
  inline Result_void_ create_Result_void_() {
    return Result<void>::withValue();
  }
  inline Result_void_ create_Result_void_(const std::exception_ptr& error) {
    return Result<void>::withError(error);
  }
  
  // pragma MARK: Result<std::shared_ptr<Promise<void>>>
  using Result_std__shared_ptr_Promise_void___ = Result<std::shared_ptr<Promise<void>>>;
  inline Result_std__shared_ptr_Promise_void___ create_Result_std__shared_ptr_Promise_void___(const std::shared_ptr<Promise<void>>& value) {
    return Result<std::shared_ptr<Promise<void>>>::withValue(value);
  }
  inline Result_std__shared_ptr_Promise_void___ create_Result_std__shared_ptr_Promise_void___(const std::exception_ptr& error) {
    return Result<std::shared_ptr<Promise<void>>>::withError(error);
  }

} // namespace margelo::nitro::bluetoothstatemanager::bridge::swift

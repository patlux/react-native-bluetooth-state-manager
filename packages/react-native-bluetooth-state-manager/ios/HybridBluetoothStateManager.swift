import CoreBluetooth
import Foundation
import NitroModules

class CentralManager: NSObject, CBCentralManagerDelegate {
    var centralManager: CBCentralManager!
    typealias Callback = (BluetoothState) -> Void
    
    var callback: Callback?

    init(paramCallback: @escaping Callback) {
        super.init()
        self.callback = paramCallback
        self.centralManager = CBCentralManager(delegate: self, queue: nil)
    }

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        self.callback!(self.stateToBluetoothState(central.state))
    }
    
    func getState() -> BluetoothState {
        return self.stateToBluetoothState(self.centralManager.state)
    }
    
    func stateToBluetoothState(_ state: CBManagerState) -> BluetoothState {
        switch state {
        case .unknown:
                .unknown
        case .resetting:
                .resetting
        case .unsupported:
                .unsupported
        case .unauthorized:
                .unauthorized
        case .poweredOff:
                .poweredoff
        case .poweredOn:
                .poweredon
        @unknown default:
                .unknown
        }
    }
}

class Listener {
    let callback: (BluetoothState) -> Void

    init(callback: @escaping (BluetoothState) -> Void) {
        self.callback = callback
    }
}

class HybridBluetoothStateManager: HybridBluetoothStateManagerSpec {
    var listeners: [String: Listener] = [:]
    
    func addListener(callback: @escaping (BluetoothState) -> Void) throws -> String {
        let listener = Listener(callback: callback)
        let key = UUID().uuidString
        listeners[key] = listener
        return key
    }
    
    func removeListener(callbackRef: String) throws {
        listeners.removeValue(forKey: callbackRef)
    }

    var centralManager: CBCentralManager!
    var bManager: CentralManager!

    override init() {
        super.init()
        self.bManager = CentralManager.init { state in
            for listener in self.listeners.values {
                listener.callback(state)
            }
        }
    }

    func getState() throws -> NitroModules.Promise<BluetoothState> {
        return Promise.async {
            return self.bManager.getState()
        }
    }
    
    func getStateSync() throws -> BluetoothState {
        return self.bManager.getState()
    }

    func openSettings() throws -> NitroModules.Promise<Void> {
        return Promise.async {
            if let url = URL(string: UIApplication.openSettingsURLString) {
                // Ask the system to open that URL.
                await UIApplication.shared.open(url)
            }
        }
    }
    
    func requestToEnable() throws -> NitroModules.Promise<Void> {
        throw RuntimeError.error(withMessage: "Not supported on iOS")
    }
    
    func requestToDisable() throws -> NitroModules.Promise<Void> {
        throw RuntimeError.error(withMessage: "Not supported on iOS")
    }
}

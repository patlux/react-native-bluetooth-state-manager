
Pod::Spec.new do |s|
  s.name         = "RNBluetoothStateManager"
  s.version      = "0.0.0-development"
  s.summary      = "RNBluetoothStateManager"
  s.description  = <<-DESC
                  RNBluetoothStateManager
                   DESC
  s.homepage     = "https://github.com/patlux/react-native-bluetooth-state-manager"
  s.license      = "MIT"
  s.author       = { "author" => "email@patwoz.de" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/patlux/react-native-bluetooth-state-manager.git", :tag => "master" }
  s.source_files = "ios/*.{h,m}"
  s.requires_arc = true


  s.dependency "React-Core"
  #s.dependency "others"

end


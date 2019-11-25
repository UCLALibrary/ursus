# frozen_string_literal: true
namespace :ursus do
  namespace :sinai do
    desc 'Turn ON auth and styling for Sinai Manuscripts site'
    task on: [:environment] do
      Flipflop::Feature.where(key: "sinai").all.each.map(&:destroy!)
      Flipflop::Feature.create(key: "sinai", enabled: true)
      puts "Enabled auth and styling for Sinai Manuscripts site"
    end

    desc 'Turn OFF auth and styling for Sinai Manuscripts site)'
    task off: [:environment] do
      Flipflop::Feature.where(key: "sinai").all.each.map(&:destroy!)
      Flipflop::Feature.create(key: "sinai", enabled: false)
      puts "Disabled auth and styling for Sinai Manuscripts site"
    end
  end
end

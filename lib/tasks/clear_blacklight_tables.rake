namespace :blacklight do
    desc "Clears Searches and Users tables"
    task clear_tables: :environment do
      ActiveRecord::Base.transaction do
        # Clear Searches Table
        puts "Clearing Searches table..."
        Search.delete_all
        puts "Searches table cleared."
  
        # Clear Users Table
        puts "Clearing Users table..."
        User.delete_all
        puts "Users table cleared."
      end
  
      puts "All specified tables have been cleared successfully."
    end
  end
  
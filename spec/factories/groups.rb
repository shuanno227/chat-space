FactoryBot.define do
  
factory :group do
  title {Faker::Team.name}
end

end
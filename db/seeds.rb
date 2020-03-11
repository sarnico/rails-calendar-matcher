# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



user = User.new :email => "charline.hugues@gmail.com", :password => "123456", :avatar =>"https://cdn.radiofrance.fr/s3/cruiser-production/2019/08/45b31951-df68-4e7b-8558-aeb55e99b127/1200x800_vanhoenacker_charline_3.jpg"
user.save!

user2 =  User.new :email => "ernestine.gilly@gmail.com", :password => "123456", :avatar =>"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhxZn2XB4vjmlsnJztqsQ1nWn0HF4T8wc7bYIHLfp3Zkn44Meq"
user2.save!

user3 = User.new :email => "raimond.pagnol@gmail.com", :password => "123456", :avatar =>"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRysbshl5Pf4i-EmFdGjaEAyn97cq8_vgt-nG3xnezWoODbstHe"
user3.save!


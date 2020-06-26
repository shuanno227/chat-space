require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      # textとimageが存在すれば保存できること
      it "is valid with a text, image" do
        message = build(:message)
        expect(message).to be_valid
      end
      # textがあれば保存できること
      it "is valid with a text only" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end
      # imageがあれば保存できること
      it "is valid with a image only" do
        message = build(:message, text: nil)
        expect(message).to be_valid
      end
    end
    context 'can not save' do
      # textもimageも存在しないと保存できないこと
      it "is invalid without a text & image" do
        message = build(:message, text: nil, image: nil)
        message.valid?
        expect(message.errors[:text]).to include("を入力してください")
      end
      # group_idが存在しないと保存できないこと
      it "is invalid without a group" do
        message = build(:message, group_id: nil) 
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      # user_idが存在しないと保存できないこと
      it "is invalid without a user" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
json.array! @messages do |message|
  json.id message.id
  json.nickname message.user.nickname
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M:%S")
  json.text message.text
  json.image message.image.url
end

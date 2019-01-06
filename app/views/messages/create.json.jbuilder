json.text @message.text
json.image @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.nickname @message.user.nickname

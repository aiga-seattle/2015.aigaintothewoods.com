require "rack/jekyll"

use Rack::Auth::Basic, "AIGA Seattle" do |username, password|
  username == 'aiga'  && 'betweenthelines' == password
end

run Rack::Jekyll.new
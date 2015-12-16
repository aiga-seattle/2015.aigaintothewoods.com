require "rack/jekyll"
require "rack/nocache"

# use Rack::Auth::Basic, "AIGA Seattle" do |username, password|
#   username == 'aiga'  && 'betweenthelines' == password
# end

use Rack::Nocache

run Rack::Jekyll.new

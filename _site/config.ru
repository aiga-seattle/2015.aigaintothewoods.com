require "rack/jekyll"
require "rack/cache"

# use Rack::Auth::Basic, "AIGA Seattle" do |username, password|
#   username == 'aiga'  && 'betweenthelines' == password
# end

use Rack::Cache, allow_reload: false

run Rack::Jekyll.new

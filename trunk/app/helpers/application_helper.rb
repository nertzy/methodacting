# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def connection_to_sentence(connection)
    "#{link_to h(connection.source.name), actor_path(connection.source)} has a #{connection.tag} connection with #{link_to h(connection.target.name), actor_path(connection.target)} (created by #{link_to h(connection.creator.name), user_path(connection.creator)})"
  end
end

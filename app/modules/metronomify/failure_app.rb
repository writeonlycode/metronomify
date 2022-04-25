module Metronomify
  class FailureApp < Devise::FailureApp
    # Overriding respond to prevent redirect
    def respond
      self.status = 401
      self.content_type = 'application/json'
      response.body = { error: i18n_message }.to_json
    end

    # Overriding i18n_message to prevent capitalization of authentication_keys
    def i18n_message(default = nil)
      message = warden_message || default || :unauthenticated

      if message.is_a?(Symbol)
        options = { resource_name: scope, scope: 'devise.failure', default: [message] }
        auth_keys = scope_class.authentication_keys
        keys = (auth_keys.respond_to?(:keys) ? auth_keys.keys : auth_keys).map { |key| key.to_s.humanize(capitalize: false) }
        options[:authentication_keys] = keys.join(I18n.translate(:"support.array.words_connector"))
        options = i18n_options(options)

        I18n.t(:"#{scope}.#{message}", **options)
      else
        message.to_s
      end
    end
  end
end

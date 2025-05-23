namespace AppLibrary.Models.Configuration
{
    public class ApplicationSettings
    {
        public AwsCognitoSettings Cognito { get; set; } = new AwsCognitoSettings();

        // You can add other specific settings properties here in the future, for example:
        // public EmailSettings Email { get; set; } = new EmailSettings();
        // public FeatureFlagsSettings FeatureFlags { get; set; } = new FeatureFlagsSettings();
    }
}

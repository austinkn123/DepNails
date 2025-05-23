namespace AppLibrary.Models.Configuration
{
    public class AwsSettings
    {
        public AwsCognitoSettings Cognito { get; set; } = new AwsCognitoSettings();
    }
}

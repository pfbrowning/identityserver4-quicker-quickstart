namespace IdentityServerSample.Configuration {
    /// <summary>
    /// Strongly-typed general configuration.  This is intended as a catch-all
    /// generic configuration class for one-off entries and sets of configuration
    /// entries which aren't big enough to justify creating their own config
    /// class.
    /// </summary>
    public class GeneralConfig {
        public string[] AllowedCorsOrigins { get; set; }
    }
}
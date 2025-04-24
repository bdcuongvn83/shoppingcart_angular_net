namespace shoppingcart.Server.utils
{
    public class StringUtils
    {
        public static bool nullOrBlank(string val)
        {
            return val == null || val.Length == 0;
        }
    }
}

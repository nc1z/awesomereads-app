package com.nc1z.server.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    public static String payloadJWTExtraction(String token, String extraction) {

        // Remove "Bearer " from the String to get JWT
        token.replace("Bearer ", "");

        // Split JWT into 3 parts
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        // Get the payload - 2nd element in the JWT with index 1 in the string array
        String payload = new String(decoder.decode(chunks[1]));

        // Split the payload JSON by commas, so we get each key value pair as a string array element
        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<String, String>();

        // Loop through each entry until we find a key "sub"
        for (String entry : entries) {
            String[] keyValue = entry.split(":");
            if (keyValue[0].equals(extraction)) {

                // By default we want to remove the quotation on the sub and any weird symbols behind
                // Then once cleaned, we store inside our hashmap
                int remove = 1;
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);

                map.put(keyValue[0], keyValue[1]);
            }
        }

        if (map.containsKey(extraction)) {
            return map.get(extraction);
        }

        return null;
    }
}

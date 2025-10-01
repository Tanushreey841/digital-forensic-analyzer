package com.forensic.analyzer.util;

import org.apache.commons.codec.digest.DigestUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class HashUtil {
    public static String getSHA256(File file) throws IOException {
        try (FileInputStream fis = new FileInputStream(file)) {
            return DigestUtils.sha256Hex(fis);
        }
    }
}

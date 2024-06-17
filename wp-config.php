<?php
define( 'WP_CACHE', false ); // Added by WP Rocket


 // Added by WP Rocket
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */





define('DB_NAME', 'cawkdgckkt');
/** MySQL database username */
define('DB_USER', 'variscite_main');
/** MySQL database password */
define('DB_PASSWORD', 'Ostrovsky@77');
/** MySQL hostname */
define('DB_HOST', 'localhost');
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
/**#@+
 * Authentication Unique Keys and Salts.
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 */
require('wp-salt.php');
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wtj_';
/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define( 'WP_AUTO_UPDATE_CORE', false );
define('FS_METHOD','direct');
define('FS_CHMOD_DIR', (0775 & ~ umask()));
define('FS_CHMOD_FILE', (0664 & ~ umask()));
define( 'WP_MEMORY_LIMIT', '128M' );

// define('WP_ALLOW_REPAIR', true);

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
if( isset( $_GET['vdebug'] ) ){
	define( 'WP_DEBUG', true );
}else{
	define( 'WP_DEBUG', true );
	define( 'WP_DEBUG_LOG', 'vari-wp-errors4.log' );
	define( 'WP_DEBUG_DISPLAY', false );
}
define('DISALLOW_FILE_EDIT', true);
define( 'WP_REDIS_CONFIG', [
 
   'host' => '127.0.0.1',
   'port' => 6379,
   'database' => "1787", 
   'timeout' => 2.5,
   'read_timeout' => 2.5,
   'split_alloptions' => true,
   'async_flush' => true,
   'client' => 'phpredis', 
  
   'prefetch' => true, 
   'debug' => false,
   'save_commands' => false,
   'prefix' => DB_NAME,  
   ] );
define( 'WP_REDIS_DISABLED', false );
define('WP_DEFAULT_THEME', 'twentytwentyfour');

/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
        define('ABSPATH', dirname(__FILE__) . '/');
/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

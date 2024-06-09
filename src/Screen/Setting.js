import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


export default function Example() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings & Account</Text>
        </View>

        <ScrollView>
          <View style={styles.profile}>
            <Image
              alt=""
              source={{
                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
              }}
              style={styles.profileAvatar}
            />

            {/* <Text style={styles.profileName}>John Doe</Text>

            <Text style={styles.profileEmail}>john.doe@mail.com</Text> */}

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>

                <FeatherIcon color="#fff" name="edit" size={16} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
                    <FeatherIcon color="#fff" name="mail-outline" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Notification Setting</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}></Text>

                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>

              {/* <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, {backgroundColor: '#007AFF'}]}>
                    <FeatherIcon color="#fff" name="moon" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Dark Mode</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={darkMode => setForm({...form, darkMode})}
                    value={form.darkMode}
                  />
                </View>
              </View> */}

              {/* <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
                    <FeatherIcon color="#fff" name="navigation" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Location</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Los Angeles, CA</Text>

                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View> */}

              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
                    <FeatherIcon color="#fff" name="globe" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Shipping Address</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}></Text>

                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
                    <FeatherIcon color="#fff" name="globe" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Payment Info</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}></Text>

                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
                    <FeatherIcon color="#fff" name="globe" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Delete Account</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}></Text>

                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>App Settings</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, {backgroundColor: '#38C959'}]}>
                      <FeatherIcon color="#fff" name="at-sign" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Eneble Face ID For Log In</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={emailNotifications =>
                        setForm({...form, emailNotifications})
                      }
                      value={form.emailNotifications}
                    />
                  </View>
                </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <View
                      style={[styles.rowIcon, {backgroundColor: '#38C959'}]}>
                      <FeatherIcon color="#fff" name="bell" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Eneble Push Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={pushNotifications =>
                        setForm({...form, pushNotifications})
                      }
                      value={form.pushNotifications}
                    />
                  </View>
                </View>

                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                  <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
                    <FeatherIcon color="#fff" name="navigation" size={20} />
                  </View>

                    <Text style={styles.rowLabel}>Eneble Location Services</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={emailNotifications =>
                        setForm({...form, emailNotifications})
                      }
                      value={form.emailNotifications}
                    />
                  </View>
                </View>

                <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, {backgroundColor: '#007AFF'}]}>
                    <FeatherIcon color="#fff" name="moon" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Dark Mode</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={darkMode => setForm({...form, darkMode})}
                    value={form.darkMode}
                  />
                </View>
              </View>

                {/* <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <View
                      style={[styles.rowIcon, {backgroundColor: '#FE3C30'}]}>
                      <FeatherIcon color="#fff" name="music" size={20} />
                    </View>

                    <Text style={styles.rowLabel}>Sound</Text>

                    <View style={styles.rowSpacer} />

                    <Text style={styles.rowValue}>Default</Text>

                    <FeatherIcon
                      color="#C6C6C6"
                      name="chevron-right"
                      size={20}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8B8B8B',
    marginRight: 4,
  },
});

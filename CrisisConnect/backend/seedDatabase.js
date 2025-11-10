import mongoose from "mongoose";

// ----------------- Schemas -----------------
const registeredUsersSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  sex: String,
  height: Number,
  weight: Number,
  bloodgroup: String,
  dob: Date,
  email: { type: String, required: true, unique: true },
  phoneno: String,
  adharno: String,
  homeaddress: String,
  password: { type: String, required: true }
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  req_time: { type: Date, default: Date.now },
  location: String,
  pincode: String,
  state: String,
  suburb: String,
  fullfilled: { type: Boolean, default: false },
  service: String,
  district: String,
  coordinates: String
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
  email: String,
  Messege: [
    {
      sender: String,
      messege: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

// ----------------- Models -----------------
const RegisteredUsers = mongoose.model("RegisteredUser", registeredUsersSchema, "registeredusers");

const Admin = mongoose.model("admin", adminSchema);
const Service = mongoose.model("service", serviceSchema);
const Message = mongoose.model("messege", messageSchema);

// ----------------- Connect to MongoDB -----------------
mongoose.connect("mongodb://0.0.0.0:27017/CrisisConnect")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// ----------------- Seed Data -----------------
const seedDatabase = async () => {
  try {
    // Clear previous data (optional)
    await RegisteredUsers.deleteMany({});
    await Admin.deleteMany({});
    await Service.deleteMany({});
    await Message.deleteMany({});

    // Create sample admin
    const adminUser = new Admin({
      fullname: "Darshan Admin",
      email: "admin@crisisconnect.com",
      password: "admin123"
    });
    await adminUser.save();

    // Create sample user
    const normalUser = new RegisteredUsers({
      fullname: "John Doe",
      sex: "Male",
      height: 175,
      weight: 70,
      bloodgroup: "O+",
      dob: new Date("1990-01-01"),
      email: "johndoe@gmail.com",
      phoneno: "9999999999",
      adharno: "123412341234",
      homeaddress: "123 Main Street, City, State",
      password: "user123"
    });
    await normalUser.save();

    // Create sample service request
    const serviceRequest = new Service({
      name: normalUser.fullname,
      email: normalUser.email,
      phone: normalUser.phoneno,
      req_time: new Date(),
      location: "123 Main Street, City, State",
      pincode: "123456",
      state: "State",
      suburb: "City",
      fullfilled: false,
      service: "Medical Help",
      district: "District",
      coordinates: "12.9716 N,77.5946 E"
    });
    await serviceRequest.save();

    // Create sample message
    const message = new Message({
      email: normalUser.email,
      Messege: [
        { sender: "user", messege: "Hello, I need help!" },
        { sender: "admin", messege: "Admin here, how can I assist?" }
      ]
    });
    await message.save();

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

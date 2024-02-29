{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.napalm.url = "github:nix-community/napalm";

  # NOTE: This is optional, but is how to configure napalm's env
  inputs.napalm.inputs.nixpkgs.follows = "nixpkgs";

  outputs = { self, nixpkgs, napalm }:
  let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages."${system}";
  in {
    # Assuming the flake is in the same directory as package-lock.json
    packages."${system}".bnycdn = napalm.legacyPackages."${system}".buildPackage ./. { };

    devShells."${system}".default = pkgs.mkShell {
      nativeBuildInputs = with pkgs; [ nodejs ];
    };
  };
}

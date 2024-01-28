import React, { ReactNode } from "react";

type Props = {
	params: {
		roomId: string;
	};
	children: ReactNode;
};

const Layout = (props: Props) => {
	return <>{props.children}</>;
};

export default Layout;

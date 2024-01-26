import React, { ReactNode } from "react";

type Props = {
	params: {
		roomId: string;
	};
	children: ReactNode;
};

const Layout = (props: Props) => {
	return <div>{props.children}</div>;
};

export default Layout;
